# cabin
Savonia Code Academyn Mökkivarausjärjestelmä-projekti

Tehtävänä oli rakentaa toimiva sovellus mökkien vuokraukseen ja varaukseen. Toteutetut ominaisuudet olivat seuraavat:

- Kuluttaja-asiakas pystyy hakemaan mökkejä, tekemään varauksen sekä hallinnoimaan omia varauksia. 
- Mökin omistaja voi hallinnoida omia mökkejään sekä pystyy hallinoimaan mökkeihin liittyviä varauksia. 
- Admin käyttäjä voi hallinnoida toimipaikkoja, varauksia, mökkejä, palveluita sekä asiakkaita.

Käytetyt tekniikat:

   Tietokanta: mySQL Azuren pilvessä
   BackEnd: ASP.NET
   FrontEnd: React-JS (käytettyjä kirjastoja react-router-dom, bootstrap), tilanhallinta Context Apilla
   Versionhallinta Azure DevOpsin kautta
   
Sovellus toimii, mutta ulkoasu jäi viimeistelemättömäksi. Toiminta vaatii myös yhteyden kantaan, joka ei ole enää/tällä hetkellä käytettävissä.

Kaikki Back Endiin liittyvä koodi on CabinReservations-kansiossa, FrontEnd reactfront-kansiossa. Frontin koodin kommentointi on puutteellista.
