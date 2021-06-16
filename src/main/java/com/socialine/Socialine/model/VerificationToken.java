package com.socialine.Socialine.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.Instant;

import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private int type;

    private int used;

    private String token;

    @OneToOne(fetch = LAZY, cascade=CascadeType.ALL)
    private Users user;

    private Instant expiryDate;
}
