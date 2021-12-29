package com.ase.authservice.dto;

public class AuthResponse {
  public UserDto user;
  public String statusMessage;

  public AuthResponse(UserDto user, String statusMessage) {
    this.user = user;
    this.statusMessage = statusMessage;
  }

  public AuthResponse(String statusMessage) {
    this.statusMessage = statusMessage;
  }
}
