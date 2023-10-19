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

const ENDPOINT_URL = "http://attendance.cparedesr.com/api/sheets/check_assistance";

/**
 * Ve la asistencia de los participantes en las actividades
 * @param courseId Id del curso
 * @param participants Lista de participantes
 * @param activities Lista de actividades
 * @param _variableInput Variable cualquiera de entrada, para forzar una actualización
 * @customfunction
 */
function ASSISTANCE(courseId: string, participants: AnySheetsInput, activities: AnySheetsInput, _variableInput?: any) {
  const flattenParticipants = asColumn(participants).map((e) => e?.toString() ?? "");
  const flattenActivities = asRow(activities).map((e) => e?.toString() ?? "");

  try {
    const response = UrlFetchApp.fetch(ENDPOINT_URL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        activities_slugs: flattenActivities,
        students_ids: flattenParticipants,
        course_id: courseId,
      }),
    });
    const body = response.getContentText();
    const data = JSON.parse(body);

    const matrix: string[][] = [];
    for (const student of flattenParticipants) {
      const row: string[] = [];
      matrix.push(row);
      if (student in data) {
        const studentActivities = data[student];
        for (const activity of flattenActivities) {
          row.push(activity in studentActivities ? studentActivities[activity] : "");
        }
      }
    }
    return matrix;
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
    const response = UrlFetchApp.fetch(ENDPOINT_URL + "/health_check");
    return response.getResponseCode() === 200 ? "OK" : "ERROR";
  } catch (error) {
    return error;
  }
}
