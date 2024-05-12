package awes.repository;


import awes.entity.TbVwRestaurants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface TbVwRestaurantsRepository  extends JpaRepository<TbVwRestaurants, Integer> {
    @Query(value = "SELECT id, language, name, content_url, old_address, new_address, phone_number, " +
            "website, operating_hours, traffic_info, " +
            "homepage_language, main_dish, latitude, longitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_vw_restaurants " +
            "WHERE language = 'ko' " +
            "ORDER BY distance " +
            "LIMIT :num",
            nativeQuery = true)
    List<TbVwRestaurants> findTopNNearby(@Param("latitude") double latitude,
                                         @Param("longitude") double longitude,
                                         @Param("num") int num);

    @Query(value = "SELECT id, language, name, content_url, old_address, new_address, phone_number, " +
            "website, operating_hours, traffic_info, " +
            "homepage_language, main_dish, latitude, longitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_vw_restaurants " +
            "WHERE language = 'ko' " +
            "ORDER BY distance",
            nativeQuery = true)
    List<TbVwRestaurants> findAllNearby(@Param("latitude") double latitude,
                                        @Param("longitude") double longitude);

}