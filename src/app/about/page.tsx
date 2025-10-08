
import Text from "~/shared/components/Text";
import styles from './Page.module.scss';

const AboutPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.withMaxWidth}>
        <Text tag="h1" color="accent" className={styles.padding}>About Us</Text>
        <Text tag="p" className={styles.padding}>Welcome to our recipe website, your ultimate destination for discovering and sharing delicious meals! Our platform is designed for food enthusiasts, home cooks, and anyone looking to explore the culinary arts. Here’s what you can do on our site:
        </Text>
        <Text tag="h2" color="accent">Browse an Extensive Collection of Recipes:</Text>
        <Text tag="p" className={styles.padding}>Discover a wide variety of recipes across different cuisines, dietary preferences, and cooking methods. Whether you are looking for a quick weeknight dinner, a gourmet feast, or dessert inspiration, we have got you covered!
        </Text>

        <Text tag="h2" color="accent">Create and Manage Your Dinner Parties:</Text>
        <Text tag="p" className={styles.padding}>Easily plan dinner parties by adding your favorite recipes to your personalized menu. Our intuitive interface allows you to adjust the number of guests and automatically generates a shopping list with all the necessary ingredients.
        </Text>

        <Text tag="h2" color="accent">Interactive Shopping Lists:</Text>
        <Text tag="p" className={styles.padding}>After selecting your recipes, our site compiles a comprehensive shopping list, making it simple for you to gather everything you need for your culinary adventures. Say goodbye to forgotten ingredients!
        </Text>

        <Text tag="h2" color="accent">User Registration and Recipe Contributions: </Text>
        <Text tag="p" className={styles.padding}>Join our community by registering for an account. Once you are a member, you can contribute your own recipes for others to try, share tips, and connect with fellow food lovers.
        </Text>

        <Text tag="h2" color="accent">Search and Filter Options: </Text>
        <Text tag="p" className={styles.padding}>Easily find exactly what you are looking for with our robust search and filter features. Whether you have specific ingredients in mind or are searching by category, you can quickly narrow down your options.
        </Text>

        <Text tag="h2" color="accent">Stay Updated with New Features: </Text>
        <Text tag="p" className={styles.padding}>We’re continually working to improve our site and introduce new features that enhance your cooking experience. Be sure to check back often!
        </Text>

        <Text tag="p" className={styles.padding}>At our recipe website, we believe that cooking is not just about preparing meals; it’s about bringing people together, sharing experiences, and celebrating the joy of food. We’re excited to help you embark on your culinary journey!
        </Text>

        <Text tag="p" color="accent" className={styles.padding}>Thank you for being a part of our community, and happy cooking!
        </Text>
      </div>
    </div>
  )
}
export default AboutPage