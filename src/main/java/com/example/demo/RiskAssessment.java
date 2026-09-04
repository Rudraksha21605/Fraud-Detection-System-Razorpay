package com.example.demo;

import java.util.List;

public record RiskAssessment(double riskScore, String recommendation, String reason, List<RiskRule> rules) {
}
