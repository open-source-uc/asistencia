from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class SheetsPayload(BaseModel):
    activitiesSlugs: list[str]
    usersIds: list[str]


@app.get("/api/sheets/ping")
async def ping():
    return "OK"


@app.post("/api/sheets")
async def root(payload: SheetsPayload):
    return [[f"{u}-{a}" for a in payload.activitiesSlugs] for u in payload.usersIds]


if __name__ == "__main__":
    import uvicorn

    module_name = __file__.split("/")[-1].split(".")[0]
    uvicorn.run(f"{module_name}:app", reload=True)
