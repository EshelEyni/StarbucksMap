# StarbucksMap

Welcome to StarbucksMap, an interactive web application designed to visualize the global presence of Starbucks stores. Leveraging the robust capabilities of Open Layers, this tool dynamically displays all Starbucks locations across the world, updating in real-time to reflect the most current data. Whether you're exploring coffee options while traveling or conducting market analysis, StarbucksMap provides a powerful interface to explore these venues on a global scale.

You can check it out [here ](https://coffee-map-latest.onrender.com/).

![Main board image](screenshots/starbucks-map.png)

## Features

- Dynamic Mapping: Utilizes Open Layers to render a highly interactive map that displays Starbucks locations worldwide.

- Real-time Data Fetching: Automatically retrieves the latest Starbucks store locations each time the page is loaded, ensuring up-to-date information.

- Country Filter: Includes a dropdown selection box with a comprehensive list of countries, allowing users to filter Starbucks locations based on the selected country.

- Geographic Filtering: Filters Starbucks store locations based on their geographic coordinates to match the selected country's boundaries.

- Responsive Design: Optimized for various devices and screen sizes, ensuring a seamless user experience across desktop and mobile.

- Custom Service API: Features a custom-built service that can determine if a given Starbucks store lies within the specified country's territory using its geographic coordinates and a three-letter country code.

- Interactive User Interface: Simple and intuitive interface, facilitating easy navigation and interaction with the map and data.


## Installation

- Clone the repository
- Run the following commands to run the backend:

```
$ cd backend
$ npm i
$ npm run dev
```

- Run the following commands to run the frontend:

```
$ cd frontend
$ npm i
$ npm run dev
```

## Usage

Once you start the application, navigate to \`http://localhost:5173\` (or the port specified) to access the quiz.

## Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## Contact

Your Name - esheleyni@gmail.com

Project Link: https://github.com/EshelEyni/StarbucksMap

---

Thank you for checking out StarbucksMap! Happy coding!
