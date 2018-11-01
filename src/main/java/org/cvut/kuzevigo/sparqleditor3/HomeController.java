package org.cvut.kuzevigo.sparqleditor3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    EmployeeRepository employeeRepository;

    @RequestMapping(value = "/index")
    @ResponseBody
    public List<Employee> index() {
        return (List<Employee>) employeeRepository.findAll();
    }

    @RequestMapping(value = "/runDummy", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Query> run(@RequestBody Query query) {
        query.setQuery("Result of query: "  + query.getQuery());
        return new ResponseEntity<>(query,HttpStatus.OK);
    }

}