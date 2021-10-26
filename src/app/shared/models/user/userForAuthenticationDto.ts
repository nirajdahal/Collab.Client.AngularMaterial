export interface UserForAuthenticationDto {
    email: string;
    password: string;
    clientURI: string;
}

export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
    is2StepVerificationRequired: boolean;
    provider: string;
}