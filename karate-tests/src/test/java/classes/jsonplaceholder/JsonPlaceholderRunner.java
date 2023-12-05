package classes.jsonplaceholder;

import com.intuit.karate.junit5.Karate;

public class JsonPlaceholderRunner {
    
    @Karate.Test
    Karate testUsers() {
        return Karate.run("jsonplaceholder").relativeTo(getClass());
    }
}
