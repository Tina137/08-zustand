"use client";
import css from "./TagsMenu.module.css";
import { useState } from "react";
import Link from "next/link";
import { tagsArr } from "@/types/note";

const TagsMenu = () => {
  const [def, setDef] = useState(false);
  function toggle() {
    setDef(!def);
  }

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {def && (
        <ul className={css.menuList}>
          {tagsArr.map((tag) => {
            return (
              <li
                onClick={() => setDef(false)}
                key={tag}
                className={css.menuItem}
              >
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
