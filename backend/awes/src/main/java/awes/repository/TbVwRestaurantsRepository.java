package awes.repository;


import awes.entity.TbVwRestaurants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TbVwRestaurantsRepository  extends JpaRepository<TbVwRestaurants, Integer> {
}