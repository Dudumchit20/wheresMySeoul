package awes.repository;

import awes.entity.TbVwShopping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface TbVwShoppingRepository extends JpaRepository<TbVwShopping, Integer> {
    List<TbVwShopping> findByLanguageAndNewAddressContaining(String language, String address);
}