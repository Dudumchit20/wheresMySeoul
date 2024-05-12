package awes.repository;

import awes.entity.TbSebcTourStreetKor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
@Repository
public interface TbSebcTourStreetKorRepository extends JpaRepository<TbSebcTourStreetKor, String> {

    // 주의!!!!!!!!!!!! 계산 경도, 위도로 되어 있어서 Point(:longitude, :latitude) 이렇게 쿼리해야 함
    @Query(value = "SELECT tour_key, search_keyword, alias, final_display_name, " +
            "lot_address, legal_city, legal_district, legal_neighborhood, " +
            "admin_city, admin_district, admin_neighborhood, longitude, latitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_sebc_tour_street_kor " +

            "ORDER BY distance " +
            "LIMIT :num",
            nativeQuery = true)
    List<TbSebcTourStreetKor> findTopNNearby(@Param("latitude") double latitude,
                                             @Param("longitude") double longitude,
                                             @Param("num") int num);

    //////
    @Query(value = "SELECT tour_key, search_keyword, alias, final_display_name, " +
            "lot_address, legal_city, legal_district, legal_neighborhood, " +
            "admin_city, admin_district, admin_neighborhood, longitude, latitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_sebc_tour_street_kor " +
        
            "ORDER BY distance ",
            nativeQuery = true)
    List<TbSebcTourStreetKor> findAllNearby(@Param("latitude") double latitude,
                                             @Param("longitude") double longitude);


}