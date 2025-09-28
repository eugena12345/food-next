import React from 'react';
import styles from './IngredientsEquipmentBlock.module.scss';
import dinner from './../../../../public/images/dinner.svg';
import ladle from './../../../../public/images/ladle.png';
import Text from '~/components/Text';
import type { Ingredient, Equipment } from '~/types/recepies';
import Image from "next/image";



type Props = {
  ingredients: Ingredient[];
  equipment?: Equipment[];
};

const IngredientsEquipmentBlock: React.FC<Props> = ({ ingredients, equipment }) => {
  const splitIntoColumns = <T extends Ingredient | Equipment>(array: T[]): [T[], T[]] => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];
  };

  const [ingredientsLeft, ingredientsRight] = splitIntoColumns(ingredients);
  const [equipmentLeft, equipmentRight] = splitIntoColumns(equipment || []);

  return (
    <div className={styles.container}>
      <div className={styles.leftBlock}>
        <div className={styles.title}>
          <Text tag='h3'>Ingredients</Text>
        </div>
        <div className={styles.columns}>
          <ul className={styles.column}>
            {ingredientsLeft.map((ingr, index) => (
              <li key={index}>
                <Image src={dinner} alt='logo' className={styles.dinnerLogo} />
                <div className={styles.descr}>{`${ingr.amount} ${ingr.unit} ${ingr.name}`}</div></li>
            ))}
          </ul>
          <ul className={styles.column}>
            {ingredientsRight.map((ingr, index) => (

              <li key={index}>
                <Image src={dinner} alt='logo' className={styles.dinnerLogo} />
                <div className={styles.descr}>{`${ingr.amount} ${ingr.unit} ${ingr.name}`}</div></li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.divider}>
        <div className={styles.circle}></div>
        <div className={styles.line}></div>
      </div>

      <div className={styles.rightBlock}>
        <div className={styles.title}>
          <Text tag='h3'>Equipment</Text>
        </div>
        <div className={styles.columns}>
          <ul className={styles.column}>
            {equipmentLeft.map((item, index) => (
              <li key={index}>
                <Image src={ladle} alt='logo' className={styles.dinnerLogo} />
                <div className={styles.descr}>{item.name}</div></li>
            ))}
          </ul>
          <ul className={styles.column}>
            {equipmentRight.map((item, index) => (
              <li key={index}>
                <Image src={ladle} alt='logo' className={styles.dinnerLogo} />
                <div className={styles.descr}>{item.name}</div></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientsEquipmentBlock;