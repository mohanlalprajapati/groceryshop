
export interface AuthToken {
    jti: string;
    exp: number;
    token_type: string;
    user_id: string;  
  }