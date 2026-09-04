package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/risk")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173"})
public class RiskController {
    private final RiskService riskService;

    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @PostMapping("/assess")
    public ResponseEntity<Map<String, Object>> evaluateTransaction(@RequestBody TransactionRequest request) {
        return ResponseEntity.ok(riskService.evaluateRisk(request));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "RazorGuard Risk Engine"));
    }
}
