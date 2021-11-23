package com.contactManagementSystem.utils;

import java.security.SecureRandom;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtil {
    @Bean
    public String encode(String plainPassword) {
        int strength = 10;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(strength, new SecureRandom());
        String encodedPassword = bCryptPasswordEncoder.encode(plainPassword);
        return encodedPassword;
    }
}
