interface SignupDto {
  name: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

export { LoginDto, SignupDto };
