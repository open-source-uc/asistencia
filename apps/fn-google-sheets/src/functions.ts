type SheetsTypes = string | number | boolean | Date | null | undefined;
type AnySheetsInput = SheetsTypes | SheetsTypes[] | SheetsTypes[][];

function isArrayOfArraysWithSingleElement(arr: AnySheetsInput): arr is SheetsTypes[][] {
  if (!Array.isArray(arr)) return false;
  for (const e of arr) if (!Array.isArray(e) || e.length !== 1) return false;
  return true;
}

/** Obtiene una lista de elementos de un rango de una columna */
function asColumn(col: AnySheetsInput, errorMsg = "Debe ser una columna") {
  if (isArrayOfArraysWithSingleElement(col)) return col.map((e) => e[0]);
  throw new Error(errorMsg);
}

/** Obtiene una lista de elementos de un rango de una fila */
function asRow(row: AnySheetsInput, errorMsg = "Debe ser una fila") {
  if (Array.isArray(row) && row.length === 1 && Array.isArray(row[0])) return row[0];
  throw new Error(errorMsg);
}

const BASE_URL = "https://attendance.cparedesr.com";
const BASE_API_URL = BASE_URL + "/api/v1/";

const ASSISTANCE_URL = "sheets/check_assistance";

/**
 * [DEPRECADO: Usar ATTENDANCE]
 * Ve la asistencia de los participantes en las actividades
 * @deprecated
 * @customfunction
 */
function ASSISTANCE(
  courseId: string,
  participants: AnySheetsInput,
  activities: AnySheetsInput,
  _variableInput: any = undefined,
  email: string,
  token: string
) {
  ATTENDANCE(email, token, courseId, participants, activities, _variableInput);
}

function sha512(str: string): string {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512, str)
    .map((e) => (e < 0 ? e + 256 : e).toString(16).padStart(2, "0"))
    .join("");
}

function hashStudentCode(code: string, courseId: string): string {
  return sha512(`${sha512(`${code}${courseId}`)}${courseId}`);
}

/**
 * Testea el hash
 * @customfunction
 */
function GET_HASH(code: string, courseId: string) {
  return hashStudentCode(code, courseId);
}

/**
 * Ve la asistencia de los participantes en las actividades
 * @param email Email del que se autentifica para consultar la asistencia
 * @param token Token del que se autentifica para consultar la asistencia
 * @param courseId Id o slug del curso
 * @param participants Lista de participantes, cada elemento es un código de estudiante
 * @param activities Lista de actividades, cada elemento es un slug de actividad
 * @param _variableInput Variable cualquiera de entrada, para forzar una actualización
 * @customfunction
 */
function ATTENDANCE(
  email: string,
  token: string,
  courseId: string,
  participants: AnySheetsInput,
  activities: AnySheetsInput,
  _variableInput?: any
) {
  // Asegurarse del formato del input
  const flattenParticipants = asColumn(participants).map((e) => e?.toString() ?? "");
  const flattenActivities = asRow(activities).map((e) => e?.toString() ?? "");

  // Hashear datos sensibles
  const flattenHashes = flattenParticipants.map((code) => (code ? hashStudentCode(code, courseId) : ""));

  try {
    // No se consulta si los elementos no son válidos
    const validHashes = flattenHashes.filter((e) => e !== "");
    const validActivities = flattenActivities.filter((e) => e !== "");

    // Consultar la API
    const query = { email, token, courseId, participants: validHashes, activities: validActivities };
    const data = getAssistance(query);

    // Matcher matriz con respuestas
    return flattenHashes.map((student) =>
      flattenActivities.map((activity) => (data[student]?.includes(activity) ? true : ""))
    );
  } catch (error) {
    return `Ha fallado la llamada a la API (${error})`;
  }
}

type AssistanceQuery = {
  email: string;
  token: string;
  courseId: string;
  participants: string[];
  activities: string[];
};

function getAssistance(query: AssistanceQuery): Record<string, Record<string, any>> {
  const response = UrlFetchApp.fetch(`${BASE_API_URL}courses/${query.courseId}/spreadsheets`, {
    method: "post",
    contentType: "application/json",
    headers: {
      "X-User-Email": query.email,
      "X-User-Token": query.token,
      Accept: "application/json",
    },
    payload: JSON.stringify({
      activity_slugs: query.activities,
      student_codes: query.participants,
    }),
  });

  const body = response.getContentText();
  const data = JSON.parse(body);
  return data;
}

/**
 * Ping endpoint
 * @customfunction
 */
function HEALTH_ASSISTANCE_BACKEND() {
  try {
    const response = UrlFetchApp.fetch(BASE_URL);
    return response.getResponseCode() === 200;
  } catch (error) {
    return error;
  }
}
