import { createSlice } from "@reduxjs/toolkit";

export const BeforeLeaving = createSlice({
    name: "BeforeLeaving",
    initialState: {
        fr: `
        <p><i> “ Que l'on me donne six heures pour couper un arbre, j'en passerai quatre à préparer ma hache.”</i></p>
        <p>Abraham Lincoln : prenez le temps avant de partir</p>

        <p><strong>Conseils de bons randonneurs</strong></p>
        <p>
        <li>Repérez votre itinéraire et assurez-vous des conditions d’accès aux sentiers du secteur.</li>
        <li>Assurez-vous de l’adéquation entre le niveau de l’itinéraire et votre forme physique.</li>
        <li>Renseignez-vous sur les conditions météo avant votre départ (croiser plusieurs météos).</li>
        <li>Informez un proche de votre parcours.</li>
        <li>Partez équipé de chaussures de randonnée et de vêtements chauds et imperméables.</li>
        <li>N’oubliez pas d’emporter de l’eau, de quoi vous restaurer et une protection solaire.</li>
        <li>N’abandonnez pas de détritus (ou papier toilettes) et ne faites pas de feu.</li>
        <li>Afin de limiter le piétinement de la végétation et l’érosion des sols, ne créez pas de raccourcis.</li>
        </p>

        <a href="https://www.chamoniarde.com">Le site de la Chamoniarde</a>

        <p>Soyez toujours prudent.e.s et prévoyant.e.s lors de la randonnée. Asters CEN-74 n'est pas tenu responsable en cas d'accident ou de désagrément quelconque survenu sur ce circuit.</p>

        <p>Se renseigner sur les conditions météorologiques avant de partir randonner.</p>

        <p>Coordonnées des Secours Montagne : 112</p>
        `,
        en: `
        <p><i> “ Que l'on me donne six heures pour couper un arbre, j'en passerai quatre à préparer ma hache.”</i></p>
        <p>Abraham Lincoln : prenez le temps avant de partir</p>

        <p><strong>Conseils de bons randonneurs</strong></p>
        <p>
        <li>Repérez votre itinéraire et assurez-vous des conditions d’accès aux sentiers du secteur.</li>
        <li>Assurez-vous de l’adéquation entre le niveau de l’itinéraire et votre forme physique.</li>
        <li>Renseignez-vous sur les conditions météo avant votre départ (croiser plusieurs météos).</li>
        <li>Informez un proche de votre parcours.</li>
        <li>Partez équipé de chaussures de randonnée et de vêtements chauds et imperméables.</li>
        <li>N’oubliez pas d’emporter de l’eau, de quoi vous restaurer et une protection solaire.</li>
        <li>N’abandonnez pas de détritus (ou papier toilettes) et ne faites pas de feu.</li>
        <li>Afin de limiter le piétinement de la végétation et l’érosion des sols, ne créez pas de raccourcis.</li>
        </p>

        <a href="https://www.chamoniarde.com/en">Le site de la Chamoniarde</a>

        <p>Soyez toujours prudent.e.s et prévoyant.e.s lors de la randonnée. Asters CEN-74 n'est pas tenu responsable en cas d'accident ou de désagrément quelconque survenu sur ce circuit.</p>

        <p>Se renseigner sur les conditions météorologiques avant de partir randonner.</p>

        <p>Coordonnées des Secours Montagne : 112</p>
        `,
        it: `
        <p><i> “ Que l'on me donne six heures pour couper un arbre, j'en passerai quatre à préparer ma hache.”</i></p>
        <p>Abraham Lincoln : prenez le temps avant de partir</p>

        <p><strong>Conseils de bons randonneurs</strong></p>
        <p>
        <li>Repérez votre itinéraire et assurez-vous des conditions d’accès aux sentiers du secteur.</li>
        <li>Assurez-vous de l’adéquation entre le niveau de l’itinéraire et votre forme physique.</li>
        <li>Renseignez-vous sur les conditions météo avant votre départ (croiser plusieurs météos).</li>
        <li>Informez un proche de votre parcours.</li>
        <li>Partez équipé de chaussures de randonnée et de vêtements chauds et imperméables.</li>
        <li>N’oubliez pas d’emporter de l’eau, de quoi vous restaurer et une protection solaire.</li>
        <li>N’abandonnez pas de détritus (ou papier toilettes) et ne faites pas de feu.</li>
        <li>Afin de limiter le piétinement de la végétation et l’érosion des sols, ne créez pas de raccourcis.</li>
        </p>

        <a href="https://www.chamoniarde.com/en">Le site de la Chamoniarde</a>

        <p>Soyez toujours prudent.e.s et prévoyant.e.s lors de la randonnée. Asters CEN-74 n'est pas tenu responsable en cas d'accident ou de désagrément quelconque survenu sur ce circuit.</p>

        <p>Se renseigner sur les conditions météorologiques avant de partir randonner.</p>

        <p>Coordonnées des Secours Montagne : 112</p>
        `
    }
});

export default BeforeLeaving.reducer;
