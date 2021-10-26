export interface UserForAuthenticationDto {
    email: string;
    password: string;
    clientURI: string;
}

export interface AuthResponseDto {
    isAuthSuccessful: boolean;
    token: string;
}