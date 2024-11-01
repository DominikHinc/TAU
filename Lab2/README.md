# Lab 2 - s22436 - selenium

Instalacja:

Naley przejść przez: https://www.selenium.dev/documentation/webdriver/getting_started/

Po czym wywołać w projekcie:

```
pip install -r requirements.txt
```

Uruchomienie testu:

```
python3 -m pytest ./<nazwa_pliku>
```

# Scenariusz 1 - https://nofluffjobs.com/pl/

1. Otwórz stronę.
2. Poczekaj na popup "Dbamy o Twoją prywatność".
3. Zweryfikuj, czy guzik "Akceptuj" jest widoczny.
4. Kliknij "Akceptuj".
5. Zweryfikuj, czy tekst „Tu znajdziesz nową pracę” jest widoczny.
6. Zweryfikuj, czy komponent HTML `nfj-search-box` jest widoczny.
7. Sprawdź, czy przycisk „Filtry” jest widoczny i klikalny.
8. Kliknij przycisk „Filtry”.
9. Zweryfikuj, czy pojawia się element `mat-dialog-container`.
10. Sprawdź, czy checkbox „Praca zdalna” jest widoczny.
11. Zaznacz checkbox „Praca zdalna”.
12. Zweryfikuj, czy przycisk „Pokaż Wyniki” jest widoczny.
13. Kliknij przycisk „Pokaż Wyniki”.
14. Zweryfikuj, czy boczny pasek z filtrami (element `nfj-vertical-filters`) jest widoczny.
15. Sprawdź, czy na bocznym pasku zaznaczony jest checkbox „Praca zdalna”.
16. Zweryfikuj, czy pojawia się opcja sortowania z tekstem „Sortowanie”.
17. Zweryfikuj, czy domyślne sortowanie jest ustawione na „trafność”.

# Scenariusz 2 - https://stackoverflow.com/

1. Otwórz stronę.
2. Poczekaj na wyświetlenie popupu „Your privacy choices”.
3. Zweryfikuj, czy przycisk „Accept all cookies” jest widoczny.
4. Kliknij „Accept all cookies”.
5. Zweryfikuj, czy tekst „Every developer has a tab open to Stack Overflow” umożliwia dynamiczną zmianę słowa „developer” na jedno z: „developer, data scientist, system admin, mobile developer, game developer”, przy użyciu pola `data-words`.
6. Zweryfikuj, czy pole wyszukiwania z atrybutem `name="q"` jest widoczne.
7. Sprawdź, czy przycisk „Log in” w prawym górnym rogu jest widoczny i klikalny.
8. Kliknij przycisk „Log in”.
9. Zweryfikuj, czy pojawia się okno logowania z `id="signup-modal-container"`.
10. Sprawdź, czy pole „Email” z `id="email"` jest widoczne.
11. Wpisz „asd” do pola „Email”.
12. Zweryfikuj, czy pole „Password” z `id="password"` jest widoczne.
13. Zweryfikuj, czy pole „Password” ma `type="password"`.
14. Wpisz „asd” do pola „Password”.
15. Zweryfikuj, czy przycisk „Log in” w formularzu logowania jest widoczny i klikalny.
16. Kliknij przycisk „Log in”.
17. Zweryfikuj, czy pojawił się tekst „The email is not a valid email address.”.
18. Wpisz „example@example.com” w pole „Email”.
19. Wpisz „asd” w pole „Password”.
20. Kliknij „Log in”.
21. Zweryfikuj, czy pojawił się tekst „The email or password is incorrect.”.

# Scenariusz 3 - https://pl.quora.com/

1. Otwórz stronę.
2. Zweryfikuj, czy guzik „Prywatność” jest widoczny.
3. Kliknij „Prywatność”.
4. Zweryfikuj, czy nastąpiło przekierowanie na ścieżkę „/about/privacy”.
5. Zweryfikuj, czy widoczny jest tytuł „Polityka prywatności”.
6. Zweryfikuj, czy widoczne jest zdjęcie z `src="https://qph.cf2.quoracdn.net/main-qimg-0fae83e9b276c23c934106adc980169f"`.
7. Zweryfikuj, czy widoczny jest link „Warunki świadczenia usług”.
8. Kliknij „Warunki świadczenia usług”.
9. Zweryfikuj, czy otwarta jest ścieżka „/about/tos”.
10. Zweryfikuj, czy widoczny jest tekst „Zasady użytkowania serwisu”.
11. Zweryfikuj, czy widoczny jest link tekst „Quora jest miejscem, które pozwala ludziom dzielić się wiedzą i wzbogacać świat. Zadaniem poniższych polityk jest zapewnienie wszystkim użytkownikom Quora bezpiecznego korzystania z serwisu.”
12. Zweryfikuj, czy widoczny jest link „Skarga (Indie)”.
13. Kliknij „Skarga (Indie)”.
14. Zweryfikuj, czy nastąpiło przekierowanie na ścieżkę „/about/grievance”.
15. Zweryfikuj, czy widoczny jest tytuł „Grievance Officer contact information for users in India.”

# Scenariusz 4 - https://www.lidl.pl/

1. Otwórz stronę.
2. Zweryfikuj, czy widoczny jest tekst „Zakupy robię w Lidlu!”.
3. Zweryfikuj, czy widoczny jest element o nazwie `leaflets-banner`.
4. Kliknij element o nazwie `leaflets-banner`.
5. Zweryfikuj, czy widoczny jest tekst „Nasze gazetki”.
6. Zweryfikuj widoczność dowolnego elementu z `class="flyer"`.
7. Kliknij na dowolny element z `class="flyer"`.
8. Zweryfikuj, czy widoczny jest element z `alt="Strona 1"`.
9. Zweryfikuj, czy widoczny jest element z `aria-label="Następna strona"`.
10. Kliknij element z `aria-label="Następna strona"`.
11. Zweryfikuj, czy widoczny jest element z `alt="Strona 2"`.
12. Zweryfikuj, czy widoczny jest element z `aria-label="Poprzednia strona"`.
13. Kliknij element z `aria-label="Poprzednia strona"`.
14. Zweryfikuj, czy widoczny jest element z `alt="Strona 1"`.
15. Zweryfikuj, czy widoczny jest element z `aria-label="Następna strona"`.
