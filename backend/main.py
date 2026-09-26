"""
WaterWatch TN - FastAPI Backend REST API
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(
    title="WaterWatch TN API",
    description="Backend API for Sentinel-2 NDWI Encroachment Detection & Citizen Grievances",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class ComplaintCreate(BaseModel):
    citizenName: str
    citizenPhone: str
    waterbodyId: str
    issueType: str
    description: str
    latitude: float
    longitude: float

class AssignmentCreate(BaseModel):
    officerName: str
    officerRole: str
    priority: str
    deadline: str
    instructions: str

@app.get("/")
def read_root():
    return {
        "system": "WaterWatch TN",
        "status": "OPERATIONAL",
        "agency": "Water Resources Department, Government of Tamil Nadu",
        "satellite_ingest": "Sentinel-2 MSI Active"
    }

@app.get("/api/waterbodies")
def get_waterbodies():
    return [
        {
            "id": "wb-001",
            "name": "Pallikaranai Wetland",
            "district": "Chengalpattu",
            "type": "Wetland",
            "areaHa": 128.4,
            "previousNdwi": 0.61,
            "currentNdwi": 0.38,
            "ndwiChange": -0.23,
            "changedAreaHa": 2.4,
            "latestDetection": "Land Filling"
        },
        {
            "id": "wb-002",
            "name": "Madurantakam Lake",
            "district": "Chengalpattu",
            "type": "Lake",
            "areaHa": 1150.0,
            "previousNdwi": 0.58,
            "currentNdwi": 0.41,
            "ndwiChange": -0.17,
            "changedAreaHa": 1.2,
            "latestDetection": "Illegal Construction"
        },
        {
            "id": "wb-003",
            "name": "Poondi Reservoir",
            "district": "Tiruvallur",
            "type": "Reservoir",
            "areaHa": 3450.0,
            "previousNdwi": 0.64,
            "currentNdwi": 0.29,
            "ndwiChange": -0.35,
            "changedAreaHa": 3.1,
            "latestDetection": "Sand Mining"
        }
    ]

@app.post("/api/complaints")
def create_complaint(payload: ComplaintCreate):
    complaint_id = "WTN-2026-00483"
    return {
        "status": "SUCCESS",
        "message": "Complaint registered successfully",
        "complaintId": complaint_id,
        "details": payload
    }

@app.post("/api/complaints/{complaint_id}/assign")
def assign_officer(complaint_id: str, payload: AssignmentCreate):
    return {
        "status": "SUCCESS",
        "message": f"Complaint {complaint_id} assigned to {payload.officerName}",
        "assignment": payload
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
