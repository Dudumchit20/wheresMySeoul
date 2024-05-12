package awes.repository;

import awes.entity.TbVwShopping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface TbVwShoppingRepository extends JpaRepository<TbVwShopping, Integer> {
    List<TbVwShopping> findByLanguageAndNewAddressContaining(String language, String address);
    @Query(value = "SELECT id, language, name, content_url, old_address, new_address, phone_number, " +
            "website, operating_hours, traffic_info, " +
            "latitude, longitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_vw_shopping " +
            "WHERE language = 'ko' " +
            "ORDER BY distance " +
            "LIMIT :num",
            nativeQuery = true)
    List<TbVwShopping> findTopNNearby(@Param("latitude") double latitude,
                                      @Param("longitude") double longitude,
                                      @Param("num") int num);

    @Query(value = "SELECT id, language, name, content_url, old_address, new_address, phone_number, " +
            "website, operating_hours, traffic_info, " +
            "latitude, longitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_vw_shopping " +
            "WHERE language = 'ko' " +
            "ORDER BY distance",
            nativeQuery = true)
    List<TbVwShopping> findAllNearby(@Param("latitude") double latitude,
                                     @Param("longitude") double longitude);

}