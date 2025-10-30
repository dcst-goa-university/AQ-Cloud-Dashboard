from fastapi import FastAPI

app = FastAPI()


@app.get("/preds")
def get_predictions():
    return {"message": "This is where predictions would be returned."}
