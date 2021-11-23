package com.contactManagementSystem.exception;

public class UsernameAlreadyExistException extends Exception {
    public UsernameAlreadyExistException(String message) {
        super(message);
    }
}