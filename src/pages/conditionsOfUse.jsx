import '../styles/conditionsOfUse.scss'


const ConditionsOfUsePage = () => {

    return (
        <div className="condition-of-user-page">
            <h1>Conditions d'Utilisation</h1>

            <h2>1. Acceptation des Cookies</h2>
            <p>
                En utilisant notre site Web, vous consentez à l'utilisation de cookies, y compris le cookie nommé <strong>token</strong>, conformément à notre politique sur les cookies. Ce cookie contient un JSON Web Token (JWT) qui stocke des informations sur votre session et vous permet de rester connecté à votre compte pendant que vous naviguez sur notre site.
            </p>

            <h2>2. Type de Cookie Utilisé</h2>
            <p>
                Nous utilisons principalement le cookie <strong>token</strong> pour les raisons suivantes :
            </p>
            <ul>
                <li><strong>Authentification</strong> : Le cookie <strong>token</strong> est utilisé pour identifier les utilisateurs et permettre l'accès aux fonctionnalités sécurisées de notre site. Il contient des informations sur votre session, y compris des identifiants d'utilisateur, et expire après un certain temps pour garantir la sécurité de vos données.</li>
                <li><strong>Sécurité</strong> : Ce cookie aide à protéger votre compte en vérifiant votre identité lors de chaque interaction avec notre serveur.</li>
            </ul>

            <h2>3. Gestion des Cookies</h2>
            <p>
                Vous pouvez choisir d'accepter ou de refuser les cookies. La plupart des navigateurs acceptent automatiquement les cookies, mais vous pouvez modifier les paramètres de votre navigateur pour refuser les cookies. Cependant, notez que si vous refusez le cookie <strong>token</strong>, vous ne pourrez peut-être pas accéder à certaines fonctionnalités de notre site, y compris la possibilité de vous connecter.
            </p>

            <h2>4. Consentement</h2>
            <p>
                En utilisant notre site, vous consentez à l'utilisation du cookie <strong>token</strong> et à la collecte des informations qu'il contient. Si vous n'acceptez pas l'utilisation de ce cookie, vous devez modifier vos paramètres de navigation en conséquence ou ne pas utiliser notre site.
            </p>

            <h2>5. Charte du Respect de la Vie Privée</h2>
            <p>
                Nous prenons la sécurité de vos données personnelles très au sérieux. Notre Charte du Respect de la Vie Privée décrit comment nous collectons, utilisons et protégeons vos informations, y compris celles contenues dans le cookie <strong>token</strong>. Nous mettons en œuvre des mesures appropriées pour garantir la sécurité de vos données et nous nous conformons aux lois et réglementations en vigueur sur la protection des données.
            </p>

            <h2>6. Modifications des Conditions d'Utilisation</h2>
            <p>
                Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Nous vous informerons des modifications en publiant les nouvelles conditions sur notre site. Votre utilisation continue du site après la publication des modifications constitue votre acceptation des conditions mises à jour.
            </p>

            <h2>7. Contact</h2>
            <p>
                Pour toute question concernant ces conditions d'utilisation ou notre politique sur les cookies, veuillez nous contacter à <a href="mailto:votre.email@example.com">votre.email@example.com</a>.
            </p>


        </div >
    );
}

export default ConditionsOfUsePage;
