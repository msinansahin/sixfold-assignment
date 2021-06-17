select *
from (
         select a1.id as id_from,
                a2.id as id_to,
                (
                        (
                                    (
                                        acos(
                                                        sin(a1.lat * pi() / 180)
                                                        *
                                                        sin((a2.lat * pi() / 180)) + cos((a1.lat * pi() / 180))
                                                            *
                                                                                     cos((a2.lat * pi() / 180)) *
                                                                                     cos(((a1.lon - a2.lon) * pi() / 180)))
                                        ) * 180 / pi()
                            ) * 60 * 1.1515 * 1.609344
                    ) as distance
         from airport a1,
              airport a2
         where a1.id != a2.id
     ) distances
where distance <= 100
