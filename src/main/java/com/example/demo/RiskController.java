package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/risk")
public class RiskController {

    private final RiskService riskService;

    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @PostMapping("/assess")
    public ResponseEntity<Map<String, Object>> evaluateTransaction(@RequestBody TransactionRequest request) {
        Map<String, Object> response = riskService.evaluateRisk(request);
        return ResponseEntity.ok(response);
    }
}