/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.service;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Areeb
 */
@Entity
@Table(name = "EMPLOYEEDETAILS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Employeedetails.findAll", query = "SELECT e FROM Employeedetails e"),
    @NamedQuery(name = "Employeedetails.findById", query = "SELECT e FROM Employeedetails e WHERE e.id = :id"),
    @NamedQuery(name = "Employeedetails.findByNamen", query = "SELECT e FROM Employeedetails e WHERE e.namen = :namen"),
    @NamedQuery(name = "Employeedetails.findByAddress", query = "SELECT e FROM Employeedetails e WHERE e.address = :address"),
    @NamedQuery(name = "Employeedetails.findByPhoneno", query = "SELECT e FROM Employeedetails e WHERE e.phoneno = :phoneno"),
    @NamedQuery(name = "Employeedetails.findByJob", query = "SELECT e FROM Employeedetails e WHERE e.job = :job"),
    @NamedQuery(name = "Employeedetails.findByUsername", query = "SELECT e FROM Employeedetails e WHERE e.username = :username")})
public class Employeedetails implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Size(max = 20)
    @Column(name = "NAMEN")
    private String namen;
    @Size(max = 20)
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "PHONENO")
    private Integer phoneno;
    @Size(max = 10)
    @Column(name = "JOB")
    private String job;
    @Size(max = 10)
    @Column(name = "USERNAME")
    private String username;

    public Employeedetails() {
    }

    public Employeedetails(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNamen() {
        return namen;
    }

    public void setNamen(String namen) {
        this.namen = namen;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getPhoneno() {
        return phoneno;
    }

    public void setPhoneno(Integer phoneno) {
        this.phoneno = phoneno;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Employeedetails)) {
            return false;
        }
        Employeedetails other = (Employeedetails) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.service.Employeedetails[ id=" + id + " ]";
    }
    
}
