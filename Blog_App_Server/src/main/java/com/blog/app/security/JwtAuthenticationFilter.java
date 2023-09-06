package com.blog.app.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.omg.CORBA.DynAnyPackage.Invalid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		//get token
		String requestTokenHeader=request.getHeader("Authorization");
		
		System.out.println(requestTokenHeader);
		
		
		String username=null;
		String token=null;
		
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer")) {
			
			token=requestTokenHeader.substring(7);
			
			try {
				
				username =this.jwtTokenHelper.getUsernameFromToken(token);
			}
			catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			}
			catch(ExpiredJwtException e) {
				System.out.println("JWT token has expired");
			}
			catch(MalformedJwtException e) {
				System.out.println("Invalid Jwt Token");
			}
			
		}
		else {
			System.out.println("Token does not begin with Basic");
		}
		
		
		if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
			UserDetails userDetails=this.userDetailsService.loadUserByUsername(username);
			if(this.jwtTokenHelper.validateToken(token, userDetails)) {
				
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				
			}else {
				System.out.println("Invalid JWT Token");
				
			}
		}else {
			System.out.println("UserName is  null or context is not null");
			
		}
		
		filterChain.doFilter(request, response);
	}
	
	

}
