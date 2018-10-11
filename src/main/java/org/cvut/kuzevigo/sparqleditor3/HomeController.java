package org.cvut.kuzevigo.sparqleditor3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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

}