package com.application.server.helpers;

import com.application.server.entities.User;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class UserSerializer extends JsonSerializer<User> {

    @Override
    public void serialize(User user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("userId", user.getId());
        jsonGenerator.writeStringField("email", user.getEmail());
        jsonGenerator.writeStringField("first_name", user.getFirst_name());
        jsonGenerator.writeStringField("last_name", user.getLast_name());
        jsonGenerator.writeStringField("phone", user.getPhone());

        // Serialize other fields as needed
        jsonGenerator.writeEndObject();
    }
}
