package com.youtube.videoservice.exception;

public class ResourceAlreadyExistsException extends RuntimeException{
    public ResourceAlreadyExistsException(){
        super();
    }

    public ResourceAlreadyExistsException(String message){
        super(message);
    }
}
