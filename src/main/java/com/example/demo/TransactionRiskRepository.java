package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

@Repository
public interface TransactionRiskRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT COUNT(t) FROM Transaction t WHERE t.userId = :userId AND t.timestamp >= :window")
    long countRecentTransactions(@Param("userId") String userId, @Param("window") LocalDateTime window);

    @Query("SELECT COUNT(DISTINCT t.userId) FROM Transaction t WHERE t.cardFingerprint = :fingerprint")
    long countDistinctUsersOnDevice(@Param("fingerprint") String fingerprint);  
}   