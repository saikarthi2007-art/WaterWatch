"""
WaterWatch TN - Database Schemas (SQLAlchemy / PostGIS ORM Models)
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)
    role = Column(String(20), nullable=False, default='CITIZEN')  # CITIZEN, AUTHORITY, OFFICER, ADMIN
    created_at = Column(DateTime, default=datetime.utcnow)

    complaints = relationship("Complaint", back_populates="citizen")


class Waterbody(Base):
    __tablename__ = 'waterbodies'

    id = Column(String(50), primary_key=True)
    name = Column(String(150), nullable=False)
    district = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)  # Wetland, Lake, Reservoir, Pond, River
    area_ha = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    geometry_wkt = Column(Text, nullable=True)  # WKT polygon boundary for PostGIS

    satellite_images = relationship("SatelliteImage", back_populates="waterbody")
    ndwi_analyses = relationship("NDWIAnalysis", back_populates="waterbody")
    detections = relationship("Detection", back_populates="waterbody")
    complaints = relationship("Complaint", back_populates="waterbody")


class SatelliteImage(Base):
    __tablename__ = 'satellite_images'

    id = Column(Integer, primary_key=True, index=True)
    waterbody_id = Column(String(50), ForeignKey('waterbodies.id'))
    capture_date = Column(DateTime, nullable=False)
    image_url = Column(String(255), nullable=False)
    cloud_percentage = Column(Float, default=0.0)

    waterbody = relationship("Waterbody", back_populates="satellite_images")


class NDWIAnalysis(Base):
    __tablename__ = 'ndwi_analysis'

    id = Column(Integer, primary_key=True, index=True)
    waterbody_id = Column(String(50), ForeignKey('waterbodies.id'))
    previous_ndwi = Column(Float, nullable=False)
    current_ndwi = Column(Float, nullable=False)
    ndwi_change = Column(Float, nullable=False)
    changed_area_ha = Column(Float, nullable=False)
    threshold = Column(Float, default=-0.15)
    analysis_date = Column(DateTime, default=datetime.utcnow)

    waterbody = relationship("Waterbody", back_populates="ndwi_analyses")


class Detection(Base):
    __tablename__ = 'detections'

    id = Column(Integer, primary_key=True, index=True)
    waterbody_id = Column(String(50), ForeignKey('waterbodies.id'))
    classification = Column(String(50), nullable=False)  # Land Filling, Illegal Construction, Sand Mining, Waste Dumping
    confidence = Column(Float, nullable=False)
    affected_area_ha = Column(Float, nullable=False)
    severity = Column(String(20), nullable=False)  # Low, Medium, High, Critical
    status = Column(String(30), default='DETECTED')

    waterbody = relationship("Waterbody", back_populates="detections")


class Complaint(Base):
    __tablename__ = 'complaints'

    id = Column(String(50), primary_key=True)  # WTN-2026-00482
    citizen_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    waterbody_id = Column(String(50), ForeignKey('waterbodies.id'))
    issue_type = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    evidence_urls = Column(Text, nullable=True)
    status = Column(String(30), default='Submitted')  # Submitted, Under Review, Assigned, Field Inspection, Action Taken, Resolved
    priority = Column(String(20), default='High')
    date_submitted = Column(DateTime, default=datetime.utcnow)

    citizen = relationship("User", back_populates="complaints")
    waterbody = relationship("Waterbody", back_populates="complaints")
    assignments = relationship("Assignment", back_populates="complaint")


class Assignment(Base):
    __tablename__ = 'assignments'

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(String(50), ForeignKey('complaints.id'))
    officer_name = Column(String(100), nullable=False)
    officer_role = Column(String(100), nullable=False)
    assigned_by = Column(String(100), nullable=False)
    assigned_date = Column(DateTime, default=datetime.utcnow)
    deadline = Column(String(20), nullable=False)
    instructions = Column(Text, nullable=False)
    status = Column(String(30), default='ASSIGNED')

    complaint = relationship("Complaint", back_populates="assignments")


class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, index=True)
    recipient_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    read = Column(Boolean, default=False)
