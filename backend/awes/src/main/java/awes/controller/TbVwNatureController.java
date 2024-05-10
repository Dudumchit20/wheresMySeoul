package awes.controller;


import awes.entity.TbVwNature;
import awes.service.TbVwNatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/nature")
public class TbVwNatureController {

    @Autowired
    private TbVwNatureService service;

    @GetMapping
    public List<TbVwNature> getAllNature() {
        return service.findAll();
    }
}