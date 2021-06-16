package com.socialine.Socialine.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import java.time.LocalDate;

import static javax.persistence.GenerationType.IDENTITY;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table()
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = AdminRequest.class)
public class AdminRequest {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    private int userId;
    private int clubId;
    private int subClubId;
    private String reason;
    private LocalDate date;

}
