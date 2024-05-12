package awes.repository;

import awes.entity.TbVwAttractions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
@Repository
public interface TbVwAttractionsRepository extends JpaRepository<TbVwAttractions, String> {
    @Query(value = "SELECT id, language, name, content_url, old_address, new_address, phone_number, " +
            "fax_number, website, operating_hours, operating_days, closed_days, traffic_info, tags, " +
            "accessibility, latitude, longitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_vw_attractions " +
            "WHERE language = 'ko' " +
            "ORDER BY distance " +
            "LIMIT :num",
            nativeQuery = true)
    List<TbVwAttractions> findTopNNearby(@Param("latitude") double latitude,
                                         @Param("longitude") double longitude,
                                         @Param("num") int num);

    @Query(value = "SELECT id, language, name, content_url, old_address, new_address, phone_number, " +
            "fax_number, website, operating_hours, operating_days, closed_days, traffic_info, tags, " +
            "accessibility, latitude, longitude, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_vw_attractions " +
            "WHERE language = 'ko' " +
            "ORDER BY distance",
            nativeQuery = true)
    List<TbVwAttractions> findAllNearby(@Param("latitude") double latitude,
                                        @Param("longitude") double longitude);

}
