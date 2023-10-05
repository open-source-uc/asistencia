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

const ENDPOINT_URL = "<origin>/api/sheets";

/**
 * Ve la asistencia de los participantes en las actividades
 * @customfunction
 */
function ASSISTANCE(participants: AnySheetsInput, activities: AnySheetsInput) {
  const flattenParticipants = asColumn(participants);
  const flattenActivities = asRow(activities);

  try {
    // Real request
    const response = UrlFetchApp.fetch(ENDPOINT_URL, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        activitiesSlugs: flattenActivities,
        usersIds: flattenParticipants,
      }),
    });
    const data = response.getContentText();
    return JSON.parse(data);
  } catch (error) {
    return `Ha fallado la llamada a la API (${error})`;
  }
}

/**
 * Ping endpoint
 * @customfunction
 */
function PING() {
  try {
    const response = UrlFetchApp.fetch(ENDPOINT_URL + "/ping");
    return JSON.parse(response.getContentText());
  } catch (error) {
    return error;
  }
}
