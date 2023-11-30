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
  const flattenParticipants = asColumn(participants).map((e) => e?.toString() ?? "");
  const flattenActivities = asRow(activities).map((e) => e?.toString() ?? "");

  try {
    const response = UrlFetchApp.fetch(`${BASE_API_URL}courses/${courseId}/spreadsheets`, {
      method: "post",
      contentType: "application/json",
      headers: {
        "X-User-Email": email,
        "X-User-Token": token,
        Accept: "application/json",
      },
      payload: JSON.stringify({
        activity_slugs: flattenActivities,
        student_codes: flattenParticipants,
      }),
    });

    const body = response.getContentText();
    const data: Record<string, Record<string, any>> = JSON.parse(body);

    return flattenParticipants.map((student) =>
      flattenActivities.map((activity) => {
        if (!(student in data)) return "";
        return data[student].includes(activity) ? true : "";
      })
    );
  } catch (error) {
    return `Ha fallado la llamada a la API (${error})`;
  }
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
