package awes.repository;

import awes.entity.TbTourInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
@Repository
public interface TbTourInformationRepository extends JpaRepository<TbTourInformation, String> {

    @Query(value = "SELECT name, location_name, city_name, district_name, description, additional_services, closed_days, " +
            "summer_start_time, summer_end_time, winter_start_time, winter_end_time, average_staff, english_available, " +
            "japanese_available, chinese_available, other_languages, phone_number, road_address, lot_address, " +
            "managing_organization, website_url, " +
            "latitude, longitude, data_date, provider_code, provider_name, operation_time, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_tour_information " +
            "WHERE language = 'ko' " +
            "ORDER BY distance " +
            "LIMIT :num",
            nativeQuery = true)
    List<TbTourInformation> findTopNNearby(@Param("latitude") double latitude,
                                           @Param("longitude") double longitude,
                                           @Param("num") int num);

    @Query(value = "SELECT name, location_name, city_name, district_name, description, additional_services, closed_days, " +
            "summer_start_time, summer_end_time, winter_start_time, winter_end_time, average_staff, english_available, " +
            "japanese_available, chinese_available, other_languages, phone_number, road_address, lot_address, " +
            "managing_organization, website_url, " +
            "latitude, longitude, data_date, provider_code, provider_name, operation_time, " +
            "ST_Distance_Sphere(location, ST_SRID(Point(:longitude, :latitude), 4326)) AS distance " +
            "FROM tb_tour_information " +
            "WHERE language = 'ko' " +
            "ORDER BY distance",
            nativeQuery = true)
    List<TbTourInformation> findAllNearby(@Param("latitude") double latitude,
                                          @Param("longitude") double longitude);

}
