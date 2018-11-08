package org.cvut.kuzevigo.sparqleditor3;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@Controller
public class HomeController {

    private static Logger logger = Logger.getLogger(HomeController.class.getName());

    @RequestMapping(value = "/runDummy", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Query> run(@RequestBody Query query) {
        query.setQuery("Result of query: " + query.getQuery());
        return new ResponseEntity<>(query, HttpStatus.OK);
    }

    @RequestMapping(value = "/task/{number}", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Query> submitTask(@RequestBody Query query, @PathVariable("number") Integer number) {
        logger.info("Query submitted to task " + number + ": " + query.getQuery());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}