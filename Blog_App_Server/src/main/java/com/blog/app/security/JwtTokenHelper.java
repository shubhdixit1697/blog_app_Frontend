package com.blog.app.security;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenHelper {
	
	public static final long JWT_TOKEN_VALIDITY=5*60*60;
	
	private String secret="jwtTokenKey";
	
	public String getUsernameFromToken(String token) {
		
		return getClaimFromToken(token ,Claims::getSubject);
		
	}
	
	public Date getExpirationDateFromToken(String token) {
		
		return getClaimFromToken(token, Claims::getExpiration);
		
	}
	
	public <T> T getClaimFromToken(String token,Function<Claims,T> claimsResolver) {
		
		final Claims claims=getALLClaimsFromToken(token);
		return claimsResolver.apply(claims);
		
	}
	 //to get info from token we need secret key
	private Claims getALLClaimsFromToken(String token) {
		
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		
	}
	
	private Boolean isTokenExpired(String token) {
		
		final Date expirationDate=getExpirationDateFromToken(token);
		return expirationDate.before(new Date());
		
		
	}
	
	public String generateToken(UserDetails userDetails) {
		
		Map<String,Object> claims= new HashMap<>();
		return doGenerateToken(claims,userDetails.getUsername());
		
	}
	
	private String doGenerateToken(Map<String,Object> claims,String subject) {
		
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+JWT_TOKEN_VALIDITY*100*24*60))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
		
	}
	
	public boolean validateToken(String token, UserDetails userDetails) {
		
		final String username=getUsernameFromToken(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
		
	}

}
