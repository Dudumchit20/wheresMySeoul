package awes.controller;


import awes.entity.TbVwNature;
import awes.entity.TbVwRestaurants;
import awes.service.TbVwNatureService;
import awes.service.TbVwRestaurantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
public class TableController {

    @Autowired
    private TbVwNatureService service;
    @Autowired
    private TbVwRestaurantsService tbVwRestaurantsService;

    @GetMapping("/nature")
    public List<TbVwNature> getAllNature() {
        return service.findAll();
    }

    @GetMapping("/restaurants")
    public List<TbVwRestaurants> getAllRestaurants() {
        return tbVwRestaurantsService.findAll();
    }


}