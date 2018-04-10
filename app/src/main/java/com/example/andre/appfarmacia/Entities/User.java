package com.example.andre.appfarmacia.Entities;

import java.io.Serializable;

/**
 * Created by andre on 5/04/2018.
 */

public class User {
    private String username;
    private String pass;
    private String email;
    private String name1;
    private String name2;
    private String lastName1;
    private String lastName2;
    private String genere;
    private int age;


    public User(String username, String pass, String email, String name1, String name2, String lastName1, String lastName2, String genere, int age) {
        this.username = username;
        this.pass = pass;
        this.email = email;
        this.name1 = name1;
        this.name2 = name2;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.genere = genere;
        this.age = age;
    }

    public User(String email, String name1, String name2, String lastName1, String lastName2, String genere, int age) {
        this.email = email;
        this.name1 = name1;
        this.name2 = name2;
        this.lastName1 = lastName1;
        this.lastName2 = lastName2;
        this.genere = genere;
        this.age = age;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public String getLastName1() {
        return lastName1;
    }

    public void setLastName1(String lastName1) {
        this.lastName1 = lastName1;
    }

    public String getLastName2() {
        return lastName2;
    }

    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
    }

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }


}

