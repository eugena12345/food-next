import { notFound } from 'next/navigation';
import styles from './page.module.scss';
import decorativeImage from './../../../public/images/Pattern.png';
import Text from '~/shared/components/Text';
import IngredientsEquipmentBlock from '~/shared/components/IngredientsEquipmentBlock';
type StepType = {
    description: string,
    id: number,
    image: null
}

type Props = {
    params: Promise<{ id: string }>
};
export default async function RecipePage({ params }: Props) {
    const { id } = await params;
    const product = await fetch(`https://front-school-strapi.ktsdev.ru/api/recipes/${id}?populate[0]=ingradients&populate[1]=equipments&populate[2]=directions.image&populate[3]=images&populate[4]=category`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })
        .then(r => r.ok ? r.json() : null);

    if (!product) return notFound();
    const recipe = product.data;
    return (
        <div className={styles.container}>
            <div className={styles.decorativeImage} style={{ backgroundImage: `url(${decorativeImage})` }}></div>
            <div className={styles[`container--maxWidth`]}>
                {/* {error && <div className={styles.error}>{error}</div>} */}

                {/* {isLoading && <div className={styles.center}><Loader /></div>} */}
                {recipe.name
                    && <div className={styles.recipe}>
                        <div className={styles.title}>
                            {/*TODO картиника вернуться назад */}
                            <Text view='title'>{recipe.name}</Text>
                        </div>


                        <div className={styles.preInfo}>
                            <img src={recipe.images[0].url} alt='картинка' className={styles['card__image']} />
                            <div className={styles.info}>
                                <div className={styles.descrElement}>
                                    <Text>Preparation</Text>
                                    <Text weight='bold' color='accent'>{recipe.preparationTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Cooking</Text>
                                    <Text weight='bold' color='accent'>{recipe.cookingTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Total</Text>
                                    <Text weight='bold' color='accent'>{recipe.preparationTime + recipe.cookingTime} minutes</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Likes</Text>
                                    <Text weight='bold' color='accent'>{recipe.likes}</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Servings</Text>
                                    <Text weight='bold' color='accent'>{recipe.servings} servings</Text>
                                </div>
                                <div className={styles.descrElement}>
                                    <Text>Ratings</Text>
                                    <Text weight='bold' color='accent'>{recipe.rating}/5</Text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.summary}>
                            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} ></div>
                        </div>

                        <div className={styles.need}>
                            <IngredientsEquipmentBlock
                                ingredients={recipe.ingradients}
                                equipment={recipe.equipments}
                            />
                        </div>

                        <div className={styles.description}>
                            <Text tag='h2'>Directions</Text>
                            {recipe.directions?.map((step: StepType, idx: number) => {
                                //console.log(step)
                                return (
                                    <div key={step.id} className={styles.steps}>
                                        <Text tag='h3'>Step {idx + 1}</Text>
                                        <div>{step.description}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
        ;
}