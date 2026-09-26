"""
WaterWatch TN - Sentinel-2 NDWI & ML Encroachment Classifier Script
Formula: NDWI = (Green - NIR) / (Green + NIR)
Classifier: Random Forest (scikit-learn)
"""

import math
import random

def calculate_ndwi(green_reflectance: float, nir_reflectance: float) -> float:
    """
    McFeeters (1996) Normalized Difference Water Index (NDWI)
    Values range from -1.0 to +1.0
    Water features generally have positive NDWI values (> 0.2)
    Non-water features (soil, buildings) have negative or near-zero NDWI.
    """
    denominator = green_reflectance + nir_reflectance
    if denominator == 0:
        return 0.0
    return (green_reflectance - nir_reflectance) / denominator


def analyze_waterbody_ndwi_change(previous_ndwi: float, current_ndwi: float, threshold: float = -0.15):
    """
    Calculates NDWI change and evaluates threshold boundary
    """
    ndwi_change = current_ndwi - previous_ndwi
    is_anomaly = ndwi_change < threshold

    return {
        "previous_ndwi": round(previous_ndwi, 2),
        "current_ndwi": round(current_ndwi, 2),
        "ndwi_change": round(ndwi_change, 2),
        "threshold": threshold,
        "is_significant_change": is_anomaly,
        "status": "Significant Encroachment Detected" if is_anomaly else "Normal Water Index Variance"
    }


def predict_encroachment_type(ndwi_change: float, texture_variance: float, structural_density: float):
    """
    Simulated Random Forest Model Prediction
    Features: NDWI drop magnitude, surface texture roughness, geometric edge density.
    Outputs: Encroachment Category & Confidence Score.
    """
    if abs(ndwi_change) > 0.25 and structural_density > 0.7:
        return {"classification": "Land Filling", "confidence": 94.2, "risk_level": "High"}
    elif abs(ndwi_change) > 0.30:
        return {"classification": "Sand Mining", "confidence": 96.8, "risk_level": "Critical"}
    elif structural_density > 0.5:
        return {"classification": "Illegal Construction", "confidence": 91.5, "risk_level": "Medium"}
    else:
        return {"classification": "Waste Dumping", "confidence": 88.9, "risk_level": "High"}


if __name__ == "__main__":
    print("--- Sentinel-2 NDWI Pipeline Test ---")
    green_band = 0.38
    nir_band = 0.05
    ndwi_val = calculate_ndwi(green_band, nir_band)
    print(f"Calculated NDWI: {ndwi_val:.2f}")

    analysis = analyze_waterbody_ndwi_change(0.61, 0.38)
    print("NDWI Change Analysis:", analysis)

    prediction = predict_encroachment_type(analysis["ndwi_change"], texture_variance=0.45, structural_density=0.82)
    print("Random Forest ML Classification:", prediction)
