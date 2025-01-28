package com.mahmud.aws_cloud_native_contacts.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class FrontendRoutingFilter implements Filter {

    private static final String STATIC_PATH = "static/";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String path = httpRequest.getRequestURI();

        // Skip API requests
        if (path.startsWith("/api/")) {
            chain.doFilter(request, response);
            return;
        }

        // Skip static resource requests
        if (path.contains(".")) {
            chain.doFilter(request, response);
            return;
        }

        // Try to find corresponding HTML file
        String htmlFile = path.equals("/") ? "index.html" : path.substring(1) + ".html";
        Resource resource = new ClassPathResource(STATIC_PATH + htmlFile);

        if (resource.exists()) {
            request.getRequestDispatcher("/" + htmlFile).forward(request, response);
            return;
        }

        // Try to serve 404.html for non-existent pages
        Resource notFoundPage = new ClassPathResource(STATIC_PATH + "404.html");
        if (notFoundPage.exists()) {
            request.getRequestDispatcher("/404.html").forward(request, response);
            return;
        }

        // Fall back to index.html
        request.getRequestDispatcher("/index.html").forward(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code if needed
    }

    @Override
    public void destroy() {
        // Cleanup code if needed
    }
} 