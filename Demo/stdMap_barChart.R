library(cartogram)
library(tmap)
library(maptools)
library(rgdal)
library(dplyr)
library(rnaturalearth)
library(sf)
library(ggplot2)

### Load data -----------------------------------------------------------------

setwd("C:/Users/zhang/Desktop/Umich W19/SI649/GroupProj/world_map/data")
# data_pop <- read.csv('./data_global_pop.csv', stringsAsFactors = FALSE)
data_pop <- read.csv('./population_C.csv', stringsAsFactors = FALSE)
data_global <- read.csv('./suicide-death-rates.csv', stringsAsFactors = FALSE)
world_map = ne_countries(returnclass = "sf")
pop_addon <- read.csv('./pop_addon_A.csv', stringsAsFactors = FALSE)

world_map = world_map %>% 
  select(sovereignt) %>% 
  filter(sovereignt != "Antarctica") %>% 
  st_transform(world_map, crs = "+proj=robin")

# world_map[c(44,66,8,56,114, 79, 133, 55,58,129,169), 4]
# world_map = world_map[-c(66, 56, 114, 133, 58, 169),]

# Denmark: 44/66
# France 8/56/114
# Israel: 79/ 133
# United Kingdom: 55/58
# United States of America: 129/169

data_pop = data_pop %>%
  # mutate(pop_year = year) %>%
  mutate(#pop_year = pop_year,
    # pop_sumpop = population,
    sovereignt = country) %>%
  mutate(sovereignt = replace(sovereignt, sovereignt == "Tanzania", "United Republic of Tanzania")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "United States", "United States of America")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Congo, Dem. Rep.", "Democratic Republic of the Congo")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Bahamas", "The Bahamas")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Serbia", "Republic of Serbia")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Macedonia, FYR", "Macedonia")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Slovak Republic", "Slovenia")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Russian Federation", "Russia")) %>%
  mutate(sovereignt = replace(sovereignt, sovereignt == "Congo, Rep.", "Republic of the Congo")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Kyrgyz Republic", "Kyrgyzstan")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Lao", "Laos")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Swaziland", "eSwatini")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Cote d'Ivoire", "Ivory Coast")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Timor-Leste", "East Timor"))
  

data_global = data_global %>% 
  mutate(sovereignt = Entity) %>%
  mutate(year = Year) %>%
  mutate(sovereignt = replace(sovereignt, sovereignt == "Tanzania", "United Republic of Tanzania")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "United States", "United States of America")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Congo, Dem. Rep.", "Democratic Republic of the Congo")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Bahamas", "The Bahamas")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Serbia", "Republic of Serbia")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Macedonia, FYR", "Macedonia")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Slovak Republic", "Slovenia")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Russian Federation", "Russia")) %>%
  mutate(sovereignt = replace(sovereignt, sovereignt == "Congo, Rep.", "Republic of the Congo")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Kyrgyz Republic", "Kyrgyzstan")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Lao", "Laos")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Swaziland", "eSwatini")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Cote d'Ivoire", "Ivory Coast")) %>% 
  mutate(sovereignt = replace(sovereignt, sovereignt == "Timor-Leste", "East Timor")) %>%
  transmute(sovereignt = sovereignt,
            global_year = year,
            suicide_rate_per1k = suicide_rate_per1k)

pop_addon = pop_addon %>%
  transmute(sovereignt = country,
            pop_addon = population)

data_global[data_global$sovereignt == 'Russia',]

names(data_pop) #pop
names(data_global) #scd rate
names(world_map) # country
names(pop_addon) # pop_addon

### test: check country name --------------------------------------------------------
country_world = world_map$sovereignt
country_list = data_global$sovereignt
country_list[1]
country_list[1] %in% country_world


na_list = c()
for(i in country_list){
  if(i %in% country_world == FALSE){
    # print(i)
    if(i %in% na_list == FALSE){
      na_list = c(na_list, i) # not in country_world
    }
  }
}

na_list #67
length(na_list)

add_list = c()
for(i in country_world){
  # print(i)
  if(i %in% country_list == FALSE){
    print(i)
    if(i %in% add_list == FALSE){
      add_list = c(add_list, i) # not in country_world
    }
  }
}

add_list #10

# write.csv(x = cbind(na_list), file = sprintf('country_na.csv'))
# write.csv(x = cbind(country_world), file = sprintf('country_world.csv'))

# preparing -------------------------------------------------------------------
yr = 2015

data_global_yr = data_global %>%
  filter(global_year == yr)
data_pop_yr = cbind(data_pop[,c(2,yr-1980+3)], yr)
names(data_pop_yr) = c('sovereignt', 'pop_sumpop', 'pop_year')
# data_pop_yr = data_pop %>%
#   filter(pop_year == yr)

data_global_yr_new = left_join(world_map, data_global_yr, by = "sovereignt")  %>%
  left_join(data_pop_yr[,c('sovereignt', 'pop_year','pop_sumpop')], by = 'sovereignt')

data_global_tmp = data_global_yr_new
data_global_new_yr_All = data_global_yr_new

list.remove = c()
for(i in 1:dim(data_global_tmp)[1]){
  if(data_global_tmp[i,]$sovereignt %in% pop_addon$sovereignt &
     is.na(data_global_tmp[i,]$pop_sumpop)){
    index_pop = which(data_global_tmp[i,]$sovereignt == pop_addon$sovereignt)
    data_global_new_yr_All$pop_sumpop[i] = pop_addon$pop_addon[index_pop]
    # data_global_new_yr_All$suicide_rate_per1k.x[i] = NA
  }

  
  if(is.na(data_global_new_yr_All$pop_sumpop[i])){
    list.remove = c(list.remove, i)
  }
}
data_global_new_yr_All = data_global_new_yr_All[-(list.remove),]

# data_global_yr %>%
#   arrange(desc(suicide_rate_per1k))
list.selected = c('United States of America', 'Russia', 
                  'United Kingdom', 'South Africa', 'China',
                  'Greenland', 'Lesotho', 'Guyana', 'Lithuania')
data_global_yr.selected = data_global_yr[which(data_global_yr$sovereignt %in% list.selected),] %>%
  arrange(desc(suicide_rate_per1k)) %>%
  mutate(order = -seq(1:9)) %>%
  mutate(sovereignt = replace(sovereignt, sovereignt == "United States of America", "U.S.")) %>%
  mutate(sovereignt = replace(sovereignt, sovereignt == "United Kingdom", "U.K.")) 

write.csv(x = data_global_yr.selected, file = 'data_global_yr_selected.csv')

### bar chart -------------------------------------------------------------------
data_global_yr.selected <- read.csv(file = 'data_global_yr_selected.csv')

# plot(data_global_yr.selected$suicide_rate_per1k)

x_lab_tick = toString(data_global_yr.selected$order)
x_lab_name = data_global_yr.selected$sovereignt
text_label = c('No. 1', 'No. 2', 'No. 3', 'No. 4', 'No. 5', 
               '', '', '', '')
scd_world = 11.28/100


library(plotly)
library(htmlwidgets)

g <- ggplot(data = data_global_yr.selected, 
       aes(x = sovereignt, y = suicide_rate_per1k,
           fill = as.factor(order))) +
  geom_bar(stat = 'identity') +
  geom_hline(yintercept = scd_world, linetype = "dashed", color = "grey", size = 2) +
  # ylim(0,0.8) +
  scale_fill_manual(values = rep('#536cb3',9)) + 
  # scale_fill_brewer(palette = "YlGnBu") + #"YlGnBu"
  theme_minimal() +
  scale_x_discrete(limits = rev(x_lab_name)) + #, position = "top") +
  # scale_y_continuous(position = "right") +
  # scale_y_discrete(name = "Suicide Rate (per 1k)")+
  coord_flip() +
  geom_text(aes(label = text_label, hjust = 4), 
            size = 6, color = 'white') +
  # theme_dark() +
  theme(axis.text.y = element_text(angle = 0, size = 16, face = 'bold'),
        axis.text.x = element_text(angle = 0, size = 16, face = 'bold'),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        legend.position = "none",
        plot.margin = margin(0.4, 0.4, 0.4, 0.4, "cm")) +
  annotate("text", x = 6, y = 0.57, label = "2015 Worldwide", size = 14) + 
  annotate("text", x = 5, y = 0.57, label = "Average Suicide Rate", size = 14) +
  annotate("text", x = 4, y = 0.57, label = "0.11 (per 1k)", size = 14, color = 'darkred') +
  ggsave("top5BarChart2.pdf", width = 16, height = 9)

# plotly <- ggplotly(g)
# htmlwidgets::saveWidget(plotly, file = "graph.html")

# Cartogram -------------------------------------------------------------------

# world_carto1 = cartogram_cont(data_global_new_yr_All, "pop_sumpop", maxSizeError = 1.5)
# 
# tm_shape(world_carto1) + tm_fill("suicide_rate_per1k", style="jenks") + tm_layout(frame=F)


# shp
st_write(obj = data_global_new_yr_All, dsn = toString(yr), layer="scd_glb", driver="ESRI Shapefile")




### generate files  -----------------------------------------------------------


scd_glb_yr <- function(yr, data_global, data_pop, world_map){
  
  data_global_yr = data_global %>%
    filter(global_year == yr)
  
  data_pop_yr = cbind(data_pop[,c(2,yr-1980+3)], yr)
  names(data_pop_yr) = c('sovereignt', 'pop_sumpop', 'pop_year')
  # data_pop_yr = data_pop %>%
  #   filter(pop_year == yr)
  
  data_global_yr_new = left_join(world_map, data_global_yr, by = "sovereignt")  %>%
    left_join(data_pop_yr[,c('sovereignt', 'pop_year','pop_sumpop')], by = 'sovereignt')
  
  data_global_tmp = data_global_yr_new
  data_global_new_yr_All = data_global_yr_new
  
  list.remove = c()
  for(i in 1:dim(data_global_tmp)[1]){
    if(data_global_tmp[i,]$sovereignt %in% pop_addon$sovereignt &
       is.na(data_global_tmp[i,]$pop_sumpop)){
      index_pop = which(data_global_tmp[i,]$sovereignt == pop_addon$sovereignt)
      data_global_new_yr_All$pop_sumpop[i] = pop_addon$pop_addon[index_pop]
      # data_global_new_yr_All$suicide_rate_per1k.x[i] = NA
    }
    
    
    if(is.na(data_global_new_yr_All$pop_sumpop[i])){
      list.remove = c(list.remove, i)
    }
  }
  data_global_new_yr_All = data_global_new_yr_All[-(list.remove),]
  
  data_global_new_yr_All = data_global_new_yr_All %>%
    mutate(scd_pop = suicide_rate_per1k * pop_sumpop)

  
  # Cartogram 
  # world_carto1 = cartogram_cont(data_global_new_yr_All, "scd_pop", maxSizeError = 1.5)
  # 
  # tm_shape(world_carto1) + tm_fill("suicide_rate_per1k", style="jenks") + tm_layout(frame=F)
  
  # shp
  st_write(obj = data_global_new_yr_All, dsn = toString(yr), layer=sprintf("scd_glb%d", yr), driver="ESRI Shapefile")
  
}

yr = 2000
scd_glb_yr(yr, data_global, data_pop, world_map)

for(yr in seq(1980,2016,1)){
  scd_glb_yr(yr, data_global, data_pop, world_map)
}

### chk country pop -----------------------------------------------------------
is_missing <- is.na(as.character(world@data$country_name) )
country_temp <- data.frame(world@data$NAME[is_missing == TRUE], world@data$country_name[is_missing == TRUE])
country_temp <- cbind(country_temp, rep(0, length(country_temp[,1])))
names(country_temp) <- c('country', 'chk_missing', 'population')
country_temp <- country_temp[order(country_temp$country),]

dim(country_temp)
head(country_temp)

write.csv(x = country_temp, file = 'pop_addon.csv')
country_temp = read.csv('./pop_addon.csv', stringsAsFactors = FALSE)

country_temp[country_temp$country == 'China',]$population = 1263000000
country_temp[country_temp$country == 'China',]

### !!!NOT USED ---------------------------------------------------------------
### add country pop -----------------------------------------------------------
data_global_2000 = data_global_new[data_global_new$year == 2000, ]

data_global_tmp = data_global_2000[1,] %>% 
  transform(X = 0, 
            country.year = '', 
            country = '', 
            year = 2000, 
            sum_suicide_no = 0, 
            sum_population = 0, 
            suicide_rate_per1k = 0, HDI = 0, GDP_for_year = 0, GDP_per_capital = 0, 
            country_name = '')

data_global_add <- data_global_tmp[rep(seq_len(nrow(country_temp)), each=1),]

data_global_add$country_name = country_temp$country
data_global_add$sum_population = country_temp$population


data_global_yr = rbind(data_global_2000, data_global_add)



#________________________________________________________________________________-

df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv')
