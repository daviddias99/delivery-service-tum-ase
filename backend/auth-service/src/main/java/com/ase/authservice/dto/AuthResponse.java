package com.ase.authservice.dto;

public class AuthResponse {
  public AuthDto user;
  public String statusMessage;

  public AuthResponse(AuthDto user, String statusMessage) {
    this.user = user;
    this.statusMessage = statusMessage;
  }

  public AuthResponse(String statusMessage) {
    this.statusMessage = statusMessage;
  }
}
